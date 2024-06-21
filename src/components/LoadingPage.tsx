// ---- components
import { IconLoader } from "@tabler/icons-react";
export const LoadingPage = () => {
  return (
    <section className="w-full h-full flex justify-center items-center text-customViolet-900">
      <IconLoader
        className="animate-spin animate-duration-[2000ms]"
        width={90}
        height={90}
        strokeWidth={1.5}
      />
    </section>
  );
};
