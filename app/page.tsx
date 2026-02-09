import { pagesConfig } from "@/config/pages.config";

export default function HomePage() {
  const { Pages, mainPage } = pagesConfig;

  const mainKey = mainPage ?? Object.keys(Pages)[0];
  const MainPage = mainKey ? Pages[mainKey] : null;

  return MainPage ? <MainPage /> : null;
}
