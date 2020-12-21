import React from 'react'
import { Card, CardContent, Typography} from "@material-ui/core"
function infoBox({ title, cases, total}) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" color="textSeconadry">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <Typography className="infoBox__total" color="textSeconadry">{total} Total</Typography>
      </CardContent>
    </Card>
  )
}

export default infoBox
