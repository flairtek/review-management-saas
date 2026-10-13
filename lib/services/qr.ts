export function generateReviewQRCodeUrl(googlePlaceId: string): string {
  const reviewUrl = `https://search.google.com/local/writereview?placeid=${googlePlaceId}`;
  // Use public QR code generator API for instant render
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(reviewUrl)}`;
}
