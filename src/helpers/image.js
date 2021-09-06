/* Fields
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
   */

const fs = require(`fs`);
const path = require(`path`);
const crypto = require(`crypto`);

const qs = require(`qs`);
const base64Img = require(`base64-img`);

const cacheImage = require(`./cache-image`);

// By default store the images in `.cache` but allow the user to override
// and store the image cache away from the gatsby cache. After all, the gatsby
// cache is more likely to go stale than the images (which never go stale)
// Note that the same image might be requested multiple times in the same run

const REMOTE_CACHE_FOLDER = path.join(process.cwd(), `.cache/remote_cache`);
const CACHE_IMG_FOLDER = path.join(REMOTE_CACHE_FOLDER, `images`);

// @see https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-width-&-height
const CONTENTFUL_IMAGE_MAX_SIZE = 4000;

const imageTypes = new Set([
  `image/jpeg`,
  `image/jpg`,
  `image/png`,
  `image/webp`,
  `image/gif`,
]);

const isImage = (image) => imageTypes.has(image.file.contentType);

function getBase64Image(url) {
  if (!url) return null;

  const requestUrl = `https:${url}?w=20`;

  // Note: sha1 is unsafe for crypto but okay for this particular case
  const shasum = crypto.createHash(`sha1`);
  shasum.update(requestUrl);
  const urlSha = shasum.digest(`hex`);

  const cacheFile = path.join(CACHE_IMG_FOLDER, urlSha);

  if (fs.existsSync(cacheFile)) {
    // TODO: against dogma, confirm whether readFileSync is indeed slower
    return fs.promises.readFile(cacheFile, `utf8`);
  }

  return new Promise((resolve) => {
    base64Img.requestBase64(requestUrl, (a, b, body) => {
      // TODO: against dogma, confirm whether writeFileSync is indeed slower
      fs.promises.writeFile(cacheFile, body).then(() => resolve(body));
    });
  });
}

function getBasicImageProps(image, args) {
  let aspectRatio;
  if (args.width && args.height) {
    aspectRatio = args.width / args.height;
  } else {
    aspectRatio =
      image.file.details.image.width / image.file.details.image.height;
  }

  return {
    baseUrl: image.file.url,
    contentType: image.file.contentType,
    aspectRatio,
    width: image.file.details.image.width,
    height: image.file.details.image.height,
  };
}

function createUrl(imgUrl, options = {}) {
  // Convert to Contentful names and filter out undefined/null values.
  const args = Object.fromEntries(
    Object.entries({
      w: options.width,
      h: options.height,
      fl: options.jpegProgressive ? `progressive` : null,
      q: options.quality,
      fm: options.toFormat || ``,
      fit: options.resizingBehavior || ``,
      f: options.cropFocus || ``,
      bg: options.background || ``,
    }).filter((tuple) => !!tuple[1])
  );

  return `${imgUrl}?${qs.stringify(args)}`;
}

function getWebpVariant({ image, options }) {
  if (image.file.contentType === `image/webp` || options.toFormat === `webp`) {
    return null;
  }

  return resolveFluid(image, {
    ...options,
    toFormat: `webp`,
  });
}

function getOptions(options) {
  return {
    //maxWidth: ?
    //maxHeight: ?
    quality: 50,
    toFormat: "",
    //resizingBehavior,
    cropFocus: null,
    background: null,
    //sizes
    ...options,
  };
}

function resolveFluid(image, options) {
  if (!isImage(image)) return null;

  const { baseUrl, width, aspectRatio } = getBasicImageProps(image, options);

  let desiredAspectRatio = aspectRatio;

  // If no dimension is given, set a default maxWidth
  if (options.maxWidth === undefined && options.maxHeight === undefined) {
    options.maxWidth = 800;
  }

  // If only a maxHeight is given, calculate the maxWidth based on the height and the aspect ratio
  if (options.maxHeight !== undefined && options.maxWidth === undefined) {
    options.maxWidth = Math.round(options.maxHeight * desiredAspectRatio);
  }

  // If we're cropping, calculate the specified aspect ratio.
  if (options.maxHeight !== undefined && options.maxWidth !== undefined) {
    desiredAspectRatio = options.maxWidth / options.maxHeight;
  }

  // If the users didn't set a default sizes, we'll make one.
  if (!options.sizes) {
    options.sizes = `(max-width: ${options.maxWidth}px) 100vw, ${options.maxWidth}px`;
  }

  // Create sizes (in width) for the image. If the max width of the container
  // for the rendered markdown file is 800px, the sizes would then be: 200,
  // 400, 800, 1200, 1600, 2400.
  //
  // This is enough sizes to provide close to the optimal image size for every
  // device size / screen resolution
  let fluidSizes = [];
  fluidSizes.push(options.maxWidth / 4);
  fluidSizes.push(options.maxWidth / 2);
  fluidSizes.push(options.maxWidth);
  fluidSizes.push(options.maxWidth * 1.5);
  fluidSizes.push(options.maxWidth * 2);
  fluidSizes.push(options.maxWidth * 3);
  fluidSizes = fluidSizes.map(Math.round);

  // Filter out sizes larger than the image's maxWidth and the contentful image's max size.
  const filteredSizes = fluidSizes.filter((size) => {
    const calculatedHeight = Math.round(size / desiredAspectRatio);
    return (
      size <= CONTENTFUL_IMAGE_MAX_SIZE &&
      calculatedHeight <= CONTENTFUL_IMAGE_MAX_SIZE &&
      size <= width
    );
  });

  // Add the original image (if it isn't already in there) to ensure the largest image possible
  // is available for small images.
  if (
    !filteredSizes.includes(parseInt(width)) &&
    parseInt(width) < CONTENTFUL_IMAGE_MAX_SIZE &&
    Math.round(width / desiredAspectRatio) < CONTENTFUL_IMAGE_MAX_SIZE
  ) {
    filteredSizes.push(width);
  }

  // Sort sizes for prettiness.
  const sortedSizes = filteredSizes.sort();

  // Create the srcSet.
  const srcSet = sortedSizes
    .map((width) => {
      const h = Math.round(width / desiredAspectRatio);
      return `${createUrl(image.file.url, {
        ...options,
        width,
        height: h,
      })} ${Math.round(width)}w`;
    })
    .join(`,\n`);

  return {
    aspectRatio: desiredAspectRatio,
    baseUrl,
    src: createUrl(baseUrl, {
      ...options,
      width: options.maxWidth,
      height: options.maxHeight,
    }),
    srcSet,
    sizes: options.sizes,
  };
}

module.exports = async function getImage(image, rawOptions) {
  const options = getOptions(rawOptions);

  const webp = getWebpVariant({ image, options });

  fs.mkdirSync(CACHE_IMG_FOLDER, { recursive: true });

  const absolutePath = await cacheImage(CACHE_IMG_FOLDER, image, options);

  return {
    ...resolveFluid(image, options),
    srcWebp: webp.src,
    srcSetWebp: webp.srcSet,
    base64: await getBase64Image(image.file.url, absolutePath)
  };
};
