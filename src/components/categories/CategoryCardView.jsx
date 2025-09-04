import React from "react";
import { Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function CategoryCardView({ categories, onEdit, onViewSubcategories }) {
  return (
    <Grid container spacing={2}>
      {categories.map((cat) => (
        <Grid item xs={12} sm={6} md={4} key={cat.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{cat.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {cat.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onEdit(cat)}>Edit</Button>
              <Button size="small" onClick={() => onViewSubcategories(cat)}>View Subcategories</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
