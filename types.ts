export interface JewelryItem {
  id: number;
  name: string;
  quote: string;
  price: string;
  imageSeed: string; // Used for picsum
  description: string;
}

export interface ScrollState {
  activeIndex: number;
  progress: number;
}
