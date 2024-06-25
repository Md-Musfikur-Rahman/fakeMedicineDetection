export interface ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
}

export interface EIP6963ProviderDetail {
  provider: any; // You might want to specify a more precise type for your provider
  info: ProviderInfo;
}
