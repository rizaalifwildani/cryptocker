import React from "react"
import Skeleton from "@material-ui/lab/Skeleton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

export default function SkeletonTable() {
  return (
    <div className="loading-table">
      <List dense>
        <ListItem button>
          <ListItemText>
            <div className="d-flex justify-content-between align-items-center">
              <div className="rank d-flex flex-grow-1 align-items-center">
                <Skeleton animation="wave" className="mr-4" />
                <Skeleton
                  animation="wave"
                  variant="circle"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                <ListItemText
                  primary={<Skeleton animation="wave" width={100} />}
                  className="text-right"
                  secondary={<Skeleton animation="wave" width={50} />}
                />
              </div>
              <div className="price d-flex align-items-center">
                <ListItemText
                  primary={<Skeleton animation="wave" width={50} />}
                  className="text-right"
                  secondary={<Skeleton animation="wave" width={30} />}
                />
              </div>
            </div>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  )
}
