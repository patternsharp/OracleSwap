// @ts-ignore TYPE NEEDS FIXING
export const normalizeUrl = (src) => {
  return src[0] === '/' ? src.slice(1) : src
}

type CloudinaryFetchProps = { src: string; width?: number; height?: number; quality?: number }

type ClodunaryImageLoader = (resolverProps: CloudinaryFetchProps) => string

export const cloudinaryLoader: ClodunaryImageLoader = ({ src, width, height }: CloudinaryFetchProps) => {
  return `${normalizeUrl(src)}`
}
