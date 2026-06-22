// Dekorative Elemente im Jobwish-Stil: vierzackige Sternchen und Blob-Fotos.

export function Sparkle({
  className = "",
  size = 24,
  color = "#3f7cff",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z"
        fill={color}
      />
    </svg>
  );
}

// Foto in organischer Blob-Form mit farbigem Hintergrund-Blob dahinter.
export function BlobImage({
  src,
  alt,
  shape = "blob-1",
  backdrop = "bg-brand-200",
  className = "",
}: {
  src: string;
  alt: string;
  shape?: "blob-1" | "blob-2" | "blob-3";
  backdrop?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute -inset-3 ${shape} ${backdrop} opacity-70 blur-[2px]`}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`relative ${shape} w-full h-full object-cover shadow-card bg-brand-100`}
      />
    </div>
  );
}
