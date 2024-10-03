import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  MantineProvider,
  ColorSchemeScript,
  AppShell,
  Burger,
  NavLink,
  ScrollArea,
  Title,
  Text,
  Group,
  rem,
  em,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import type { IndexLoader } from "./routes/_index/loader";

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<IndexLoader>("routes/_index");
  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);
  const pinned = useHeadroom({ fixedAt: 120 });
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark">
          <AppShell
            header={{ height: 60, collapsed: !pinned }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header p="md">
              <Group align="center">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Title order={1} size="h3">
                  Awesome Yasunori Web
                </Title>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              <AppShell.Section grow component={ScrollArea}>
                {data?.map((d) => (
                  <NavLink
                    key={d.id}
                    onClick={() => {
                      navigate(`#${d.id}`, { replace: true });
                      // モバイルのときは移動後にサイドバーを閉じる
                      if (isMobile) {
                        close();
                      }
                    }}
                    label={
                      <Group gap="xs">
                        <Text>{`${d.title}`}</Text>
                        <Text size="xs" c="dimmed">
                          {`#${d.id}`}
                        </Text>
                      </Group>
                    }
                  />
                ))}
              </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
              {children}
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
