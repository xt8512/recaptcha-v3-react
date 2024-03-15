import GoogleProvider from "@/providers/GoogleProvider"
import LoginV3 from "./LoginV3"

const ToGoogle = () => {
  return (
    <GoogleProvider>
        <LoginV3 />
    </GoogleProvider>
  )
}

export default ToGoogle