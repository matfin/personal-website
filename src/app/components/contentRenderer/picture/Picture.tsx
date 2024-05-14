import { sizes } from '@styles';
import { Image } from '@models';

export interface Props extends Image {
  className?: '';
}

enum ImageSize {
  SM = 'sm',
  LG = 'lg',
}

const imgSrcSet = (fileType: string, name: string, size: ImageSize): string => `
  /images/${name}-${size}@1x.${fileType},
  /images/${name}-${size}@2x.${fileType} 2x,
  /images/${name}-${size}@3x.${fileType} 3x
`;

const Picture = ({ className, name, title }: Props): React.ReactNode => (
  <picture className={className}>
    <source
      data-testid="sm-webp"
      media={`(max-width: ${sizes.md}px)`}
      srcSet={imgSrcSet('webp', name, ImageSize.SM)}
      type="image/webp"
    />
    <source
      data-testid="sm-jpg"
      media={`(max-width: ${sizes.md}px)`}
      srcSet={imgSrcSet('jpg', name, ImageSize.SM)}
      type="image/jpeg"
    />

    <source
      data-testid="lg-webp"
      media={`(min-width: ${sizes.md}px)`}
      srcSet={imgSrcSet('webp', name, ImageSize.LG)}
      type="image/webp"
    />
    <source
      data-testid="lg-jpg"
      media={`(max-width: ${sizes.md}px)`}
      srcSet={imgSrcSet('jpg', name, ImageSize.LG)}
      type="image/jpeg"
    />
    <img
      src={`/images/${name}-sm@2x.jpg`}
      alt={title}
      width="320"
      height="320"
    />
  </picture>
);

export default Picture;
