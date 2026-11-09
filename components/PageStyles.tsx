const bootstrapCss =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";

type PageStylesProps = {
  stylesheet: string;
  playfair?: boolean;
  marckScript?: boolean;
  preconnectFonts?: boolean;
  bootstrap?: boolean;
};

export function PageStyles({
  stylesheet,
  playfair = false,
  marckScript = false,
  preconnectFonts = false,
  bootstrap = true,
}: PageStylesProps) {
  return (
    <>
      <link rel="stylesheet" href={stylesheet} precedence="default" />
      {playfair || marckScript || preconnectFonts ? (
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      ) : null}
      {playfair ? (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap"
            precedence="default"
          />
        </>
      ) : null}
      {marckScript ? (
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Marck+Script&display=swap&text=Ахьаца"
          precedence="default"
        />
      ) : null}
      {bootstrap ? (
        <link rel="stylesheet" href={bootstrapCss} precedence="default" />
      ) : null}
    </>
  );
}
