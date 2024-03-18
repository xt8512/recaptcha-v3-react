import GoogleProvider from "@/providers/GoogleProvider"
import LoginV3AndV2 from "./LoginV3AndV2"

const ToGoogleBoth = () => {
  return (
    <GoogleProvider>
        <LoginV3AndV2 />
    </GoogleProvider>
  )
}

export default ToGoogleBoth