import React from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function SubcategoryCardView({ subcategories, onEdit }) {
  return (
    <Grid container spacing={2}>
      {subcategories.map((sub) => (
        <Grid item xs={12} sm={6} md={4} key={sub.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{sub.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {sub.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onEdit(sub)}>Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
