"use client";

import { ImageZoom } from "@/components/kibo-ui/image-zoom";
import Image from "next/image";

type ZoomProps = {
  image: string
  alt?: string
  className?: string
}

const Zoom = ({ image, alt = "Imagem do produto", className }: ZoomProps) => (
  <ImageZoom className={className}>
    <Image
      alt={alt}
      className="h-auto w-full rounded-lg"
      height={800}
      src={image}
      unoptimized
      width={1200}
    />
  </ImageZoom>
)

export default Zoom;
