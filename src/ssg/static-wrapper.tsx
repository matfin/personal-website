export const StaticWrapper = ({
  children,
}: { children: React.ReactNode }): React.ReactElement => (
  <html lang="en-IE">
    <head>--csp--</head>
    <body>
      <div id="root">{children}</div>
      --preloadedstate--
    </body>
  </html>
);
