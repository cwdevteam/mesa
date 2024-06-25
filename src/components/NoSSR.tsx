import dynamic from "next/dynamic";
import { Fragment, type ReactNode } from "react";

const NoSSR = ({ children }: { children: ReactNode }) => (
  <Fragment>{children}</Fragment>
);

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
