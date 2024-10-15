import {
  ActionIcon,
  AppShell,
  Burger,
  ColorSchemeScript,
  Group,
  MantineProvider,
  NavLink,
  ScrollArea,
  Text,
  Title,
  rem,
} from "@mantine/core";
import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import "@mantine/core/styles.css";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import IconGitHubLogo from "~icons/tabler/brand-github";
import IconRSS from "~icons/tabler/rss";
import { YasunoriSpotlight } from "./components/yasunori-spotlight";
import { useIsMobile } from "./hooks/use-is-mobile";
import type { IndexLoader } from "./routes/_index/loader";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Yellowtail&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<IndexLoader>("routes/_index");
  const matches = useMatches();
  const isEntry = !!matches.find(({ id }) => id === "routes/entries.$id");
  const isMobile = useIsMobile();
  const pinned = useHeadroom({ fixedAt: 120 });
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="theme-color"
          content="#242424" /* var(--mantine-color-body) */
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark">
          <AppShell
            header={!isEntry ? { height: 60, collapsed: !pinned } : undefined}
            navbar={
              !isEntry
                ? {
                    width: 300,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                  }
                : undefined
            }
            padding="md"
          >
            {!isEntry && (
              <>
                <AppShell.Header p="md">
                  <Group align="center" justify="space-between">
                    <Group gap="sm">
                      <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                      />
                      <Title
                        order={1}
                        size="h2"
                        style={{ fontFamily: "'Yellowtail', cursive" }}
                      >
                        Awesome Yasunori
                      </Title>
                    </Group>
                    <Group>
                      <YasunoriSpotlight />
                      <ActionIcon
                        component="a"
                        aria-label="rss feed"
                        href="/feed.xml"
                        target="_blank"
                        variant="transparent"
                        color="gray"
                      >
                        <IconRSS />
                      </ActionIcon>
                      <ActionIcon
                        component="a"
                        aria-label="GitHub Repository"
                        href="https://github.com/times-yasunori/awesome-yasunori"
                        target="_blank"
                        variant="transparent"
                        color="gray"
                      >
                        <IconGitHubLogo />
                      </ActionIcon>
                    </Group>
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
              </>
            )}
            <AppShell.Main
              pt={
                !isEntry
                  ? `calc(${rem(60)} + var(--mantine-spacing-md))`
                  : undefined
              }
            >
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
