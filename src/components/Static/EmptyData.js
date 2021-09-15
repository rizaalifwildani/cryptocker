import React from "react"
import Typography from "@material-ui/core/Typography"

export default function EmptyData() {
  return (
    <div className="empty-data d-flex justify-content-center align-items-center py-2">
      <Typography variant="caption">Data Empty</Typography>
    </div>
  )
}
