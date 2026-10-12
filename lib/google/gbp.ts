export async function fetchBusinessLocations(accessToken: string): Promise<any[]> {
  const response = await fetch("https://mybusiness.googleapis.com/v4/accounts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  // Flatten locations from all accounts
  const locations = data.accounts?.flatMap((account: any) =>
    account.locations?.map((loc: any) => ({
      accountId: account.name,
      name: loc.displayName || "Unnamed Location",
      googleLocationId: loc.name?.split("/").pop(),
      address: loc.postalAddress?.addressLines?.join(", "),
      website: loc.websiteUri,
      phone: loc.phoneNumber,
      rating: loc.averageRating,
      reviewCount: loc.reviewCount,
      isOpen: loc.openingStatus,
    }))
  ) || [];

  return locations;
}

export async function fetchReviews(
  accessToken: string,
  locationId: string,
  maxResults: number = 10
): Promise<any[]> {
  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/locations/${locationId}/reviews?pageSize=${maxResults}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return (data.reviews || []).map((review: any) => ({
    externalReviewId: review.name?.split("/").pop() || Math.random().toString(),
    authorName: review.authorName,
    authorPhotoUrl: review.userPhoto?.photoUrl,
    rating: review.rating,
    comment: review.text || "",
    reviewDate: new Date(review.time),
    createTime: review.createTime,
  }));
}

export async function publishReply(
  accessToken: string,
  reviewName: string,
  replyText: string
): Promise<boolean> {
  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/${reviewName}/reply`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: replyText,
      }),
    }
  );

  return response.ok;
}
