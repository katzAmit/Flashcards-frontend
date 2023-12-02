import * as React from "react";
import {
  Button,Card,CardActions,CardContent,
  Typography,} from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

function GeneralCard(){
    return(
        <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                  }}
                >
                  {/* <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <NoteAltIcon />
                    </Button>
                  </CardActions>
        </Card>
    );
}

export default GeneralCard;