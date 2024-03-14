import { Stack, Text } from "@fluentui/react";

type LoginLayout = {
  children: React.ReactNode;
  title:string;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
};

function LoginLayout({ children, title, onSubmit }: LoginLayout) {
  return (
    <>
      <Stack
        verticalAlign="center"
        horizontalAlign="center"
        style={{ height: "100vh" }}
      >
        <Stack.Item
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 10,
            width: 400,
          }}
        >
          <form autoComplete="off" noValidate onSubmit={onSubmit}>
            <Stack verticalAlign="space-between" style={{ gap: 10 }}>
              {/* TITLE */}
              <Stack.Item style={{ textAlign: "center" }}>
                <Text variant="large" block>
                  {title}
                </Text>
              </Stack.Item>

              {/* CONTENT */}
              {children}
            </Stack>
          </form>
        </Stack.Item>
      </Stack>
    </>
  );
}

export default LoginLayout;
