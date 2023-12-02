import * as React from "react";
import {Grid,Container,} from "@mui/material";
import GeneralCard from "./GeneralCard";



function CardsLayout(){

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return(
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={12} md={12}>

                {/* GeneralCard uses Card to describe every card's fancunallity */}
                <GeneralCard />

              </Grid>

            ))}
          </Grid>
        </Container>
    );
}

export default CardsLayout;