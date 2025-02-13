export const StaticWrapper = ({
  children,
}: { children: React.ReactNode }): React.ReactElement => (
  <html lang="en-IE">
    <head>--csp-- --styletags--</head>
    <body>
      <div id="root">{children}</div>
      --preloadedstate--
    </body>
  </html>
);
