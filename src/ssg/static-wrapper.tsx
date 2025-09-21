export const StaticWrapper = ({
  stylesheet,
  children,
}: {
  children: React.ReactNode;
  stylesheet: string;
}): React.ReactElement => (
  <html lang="en-IE">
    <head>
      --csp--
      <link rel="stylesheet" href={stylesheet} />
    </head>
    <body>
      {/* biome-ignore lint/correctness/useUniqueElementIds: fixed mount point for React hydration */}
      <div id="root">{children}</div>
      --preloadedstate--
    </body>
  </html>
);
