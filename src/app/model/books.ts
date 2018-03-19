export interface Book {
  isCollected?: boolean;
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

interface SearchInfo {
  textSnippet: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

interface Pdf {
  isAvailable: boolean;
  acsTokenLink?: string;
  downloadLink?: string;
}

interface Epub {
  isAvailable: boolean;
  acsTokenLink?: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: ListPrice;
  retailPrice?: ListPrice;
  buyLink?: string;
  offers?: Offer[];
}

interface Offer {
  finskyOfferType: number;
  listPrice: ListPrice2;
  retailPrice: ListPrice2;
  giftable: boolean;
}

interface ListPrice2 {
  amountInMicros: number;
  currencyCode: string;
}

interface ListPrice {
  amount: number;
  currencyCode: string;
}

interface VolumeInfo {
  title: string;
  publisher?: string;
  publishedDate?: string;
  industryIdentifiers?: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount?: number;
  printType: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  authors?: string[];
  description?: string;
  subtitle?: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}