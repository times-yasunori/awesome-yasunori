import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  ColorSchemeScript,
  Group,
  MantineProvider,
  NavLink,
  ScrollArea,
  Text,
  Title,
  em,
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
  useSearchParams,
} from "@remix-run/react";
import "@mantine/core/styles.css";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useMemo } from "react";
import IconGitHubLogo from "~icons/tabler/brand-github";
import IconGraph from "~icons/tabler/graph";
import { YasunoriSpotlight } from "./components/yasunori-spotlight";
import { useIsMobile } from "./hooks/use-is-mobile";
import type { IndexLoader } from "./routes/_index/loader";
import { statsContents } from "./routes/stats/route";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Teko:wght@300..700&family=Tiny5&display=swap",
  },
];

/** yasunorized された yasunori を取得する
 * URLクリエにyasunori=<not yasunori>をつけると、
 * 先頭4文字を利用して Xxxxnori という文字列にします。
 */
function useYasunorizedYasunori() {
  const [searchParams] = useSearchParams();
  const yasunori = searchParams.get("yasunori");
  return useMemo(() => {
    if (!yasunori) return "Yasunori";
    const firstChar = yasunori.slice(0, 1);
    const secondChar = yasunori.slice(1, 4);
    return `${firstChar.toUpperCase()}${secondChar}nori`;
  }, [yasunori]);
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<IndexLoader>("routes/_index");
  const matches = useMatches();
  const isEntry = !!matches.find(({ id }) => id === "routes/entries.$id");
  const isStats = !!matches.find(({ id }) => id === "routes/stats");
  const isMobile = useIsMobile();
  const pinned = useHeadroom({ fixedAt: 120 });
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();
  const yasunorizedYasunori = useYasunorizedYasunori();
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
                    <Group gap="xs">
                      <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                      />
                      <Button
                        variant="transparent"
                        color="gray"
                        component={Title}
                        order={1}
                        size="compact-sm"
                        onClick={() => navigate("/")}
                        style={{
                          fontFamily: "'Tiny5', sans-serif",
                          fontSize: isMobile ? em(20) : em(30),
                          fontWeight: 400,
                        }}
                      >
                        Aizawa
                        <motion.span
                          style={{ marginLeft: em(2) }}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{
                            duration: 10,
                            ease: "easeInOut",
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          {yasunorizedYasunori}
                        </motion.span>
                      </Button>
                    </Group>
                    <Group gap="sm">
                      <YasunoriSpotlight />
                      <IconGraph onClick={() => navigate("/stats")} />
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
                    {isStats
                      ? statsContents.map(({ id, title }) => (
                          <NavLink
                            key={id}
                            onClick={() => {
                              navigate(`#${id}`, { replace: true });
                              // モバイルのときは移動後にサイドバーを閉じる
                              if (isMobile) {
                                close();
                              }
                            }}
                            label={
                              <Group gap="xs">
                                <Text>{title}</Text>
                              </Group>
                            }
                          />
                        ))
                      : data?.map((d) => (
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
