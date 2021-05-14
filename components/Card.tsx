import { Box, chakra } from "@chakra-ui/react"
import React from "react"

export default chakra(function Login({
  children,
  className
}: React.PropsWithChildren<{ className?: string }>) {

  return (
    <Box
      w='350px'
      boxShadow='0px 10px 6px rgba(26, 73, 113, 0.08), 0px 20px 40px rgba(26, 73, 113, 0.16);'
      className={className}
      borderRadius={'4px'}
    >
      {children}
    </Box>
  )
})