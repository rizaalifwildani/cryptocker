import React from "react"
import Skeleton from "@material-ui/lab/Skeleton"

export default function SkeletonDetail() {
  return (
    <div className="loading-detail">
      {/* TITLE */}
      <div className="coin-title d-flex align-items-center">
        <Skeleton
          animation="wave"
          variant="circle"
          width={30}
          height={30}
          className="mr-2"
        />
        <div className="coin-name d-flex align-items-end mt-1">
          <Skeleton animation="wave" className="mr-2" width={100} />
          <Skeleton animation="wave" width={50} />
        </div>
      </div>

      {/* DETAIL */}
      <div className="mt-4">
        <Skeleton variant="rect" width="100%" height={300} />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    </div>
  )
}
