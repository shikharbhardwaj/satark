library(tidyr)  # loads dplyr, tidyr, ggplot2 packages
library(dplyr)
library(ggplot2)
library(sf)         # simple features package - vector
library(raster)     # raster
library(plotly)     # makes ggplot objects interactive
library(mapview)    # quick interactive viewing of spatial objects
library(leaflet)

#Synthesizing Random Data
lon_crime<-read.csv("lon_crime.csv")
crimedata<- lon_crime[, c("Month", "Longitude", "Latitude", "Crime.type")]

#Generating Random coordinates for Assam
lat <- runif(446, 26.0000, 27.0000)
lng <-runif(446,90.0000,95.5000)

#Replacing london coordinates dates with Assam dates
crimeData<-cbind(crimedata,lat,lng)
crimeData<-crimeData[,-c(2,3)]
crime_names<-as.character(unique(crimeData$Crime.type))
crime_names<-rbind("All Crimes",crime_names)

#Generating random dates and replacing with london dates
dates<-sample(seq(as.Date('2017/01/01'), as.Date('2018/01/01'), by="day"), 446,replace=TRUE)
crimeData<-cbind(crimeData,dates)
crimeData<-crimeData[,-c(1)]


#Preparing Assam Shape File
assam <- geojsonio::geojson_read("2011_Dist.json",
                                 what = "sp")

assam_leaflet<-leaflet(assam) %>% addTiles() %>%
  addPolygons(color = "#444444", weight = 1, smoothFactor = 0.5,
              opacity = 1.0, fillOpacity = 0.5,
              highlightOptions = highlightOptions(color = "white", weight = 2,
                                                  bringToFront = TRUE))
