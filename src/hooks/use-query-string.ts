import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const addQueryParameter = useCallback(
    (name: string, value: string) => {
      router.push(`${pathname}?${createQueryString(name, value)}`);
    },
    [pathname, createQueryString, router]
  );

  const addMultipleQueryParameters = useCallback((parameters: { name: string; value: string }[]) => {
    const paramsString = parameters.map(({ name, value }) => `${name}=${value}`).join("&");
    router.push(`${pathname}?${paramsString}`);
  }, [pathname, router]);

  return {
    addQueryParameter,
    addMultipleQueryParameters,
  };
}
