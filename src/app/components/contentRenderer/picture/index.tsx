import type { Image } from '@models/types';

export type Props = Image & {
  className?: string;
};

enum ImageSize {
  SM = 'sm',
  LG = 'lg',
}

type ImageFormat = {
  type: string;
  mimeType: string;
};

const BREAKPOINT_MOBILE = '768px';
const DEFAULT_IMAGE_DIMENSIONS: Record<string, number> = {
  width: 320,
  height: 320,
} as const;

const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINT_MOBILE})`,
  desktop: `(min-width: ${BREAKPOINT_MOBILE})`,
} as const;

const SUPPORTED_FORMATS: Record<string, ImageFormat> = {
  webp: { type: 'webp', mimeType: 'image/webp' },
  jpg: { type: 'jpg', mimeType: 'image/jpeg' },
};

const imgSrcSet = (fileType: string, name: string, size: ImageSize): string =>
  [
    `/images/${name}-${size}@1x.${fileType}`,
    `/images/${name}-${size}@2x.${fileType} 2x`,
    `/images/${name}-${size}@3x.${fileType} 3x`,
  ].join(', ') as string;

const Picture = ({ className, name, title }: Props): React.ReactNode => (
  <picture className={className}>
    <source
      data-testid="sm-webp"
      media={MEDIA_QUERIES.mobile}
      srcSet={imgSrcSet(SUPPORTED_FORMATS.webp.type, name, ImageSize.SM)}
      type={SUPPORTED_FORMATS.webp.mimeType}
    />
    <source
      data-testid="sm-jpg"
      media={MEDIA_QUERIES.mobile}
      srcSet={imgSrcSet(SUPPORTED_FORMATS.jpg.type, name, ImageSize.SM)}
      type={SUPPORTED_FORMATS.jpg.type}
    />
    <source
      data-testid="lg-webp"
      media={MEDIA_QUERIES.desktop}
      srcSet={imgSrcSet(SUPPORTED_FORMATS.webp.type, name, ImageSize.LG)}
      type={SUPPORTED_FORMATS.webp.mimeType}
    />
    <source
      data-testid="lg-jpg"
      media={MEDIA_QUERIES.desktop}
      srcSet={imgSrcSet(SUPPORTED_FORMATS.jpg.type, name, ImageSize.LG)}
      type={SUPPORTED_FORMATS.jpg.mimeType}
    />
    <img
      src={`/images/${name}-sm@2x.jpg`}
      alt={title}
      width={DEFAULT_IMAGE_DIMENSIONS.width}
      height={DEFAULT_IMAGE_DIMENSIONS.height}
      loading="lazy"
      decoding="async"
    />
  </picture>
);

export default Picture;
