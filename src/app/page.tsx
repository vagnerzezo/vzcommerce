import Showcase from "@/features/home/components/showcase";
import FullBanner from "@/features/home/components/fullbanner";
import BannerGrid from "@/features/home/components/banner-grid";
import Showcases from "@/features/home/components/showcases";
import Newsletter from "@/features/home/components/newsletter";


export default async function Home() {
  return (
    <div>
      <FullBanner />
      <Showcase />
      <BannerGrid />
      <Showcases />
      <Newsletter />
    </div>
  )
}
