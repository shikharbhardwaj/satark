library(tidyr)  # loads dplyr, tidyr, ggplot2 packages
library(dplyr)
library(plyr)       # for aggregate
library(ggplot2)
library(gridExtra)  # plotting multiple plots together
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
crime_names<-c("All Crimes",crime_names)

#Generating random dates and replacing with london dates
dates<-sample(seq(as.Date('2017/01/01'), as.Date('2018/01/01'), by="day"), 446,replace=TRUE)
crimeData<-cbind(crimeData,dates)
crimeData<-crimeData[,-c(1)]

#Generating random districts for crime data
assam <- geojsonio::geojson_read("2011_Dist.json",
                                 what = "sp") 

assamTibble<-as_tibble(assam)
assamDistricts<-as.character(assamTibble$DISTRICT)
crimeDistricts <-sample( assamDistricts, 446, replace=TRUE)
crimeData<-cbind(crimeData,crimeDistricts)
selectAssamDistricts<-c("All Districts",assamDistricts)


#Preparing Assam Shape File
assam <- geojsonio::geojson_read("2011_Dist.json",
                                 what = "sp")

assam_leaflet<-leaflet(assam) %>% addTiles() %>%
  addPolygons(color = "#444444", weight = 1, smoothFactor = 0.5,
              opacity = 1.0, fillOpacity = 0.5,
              highlightOptions = highlightOptions(color = "white", weight = 2,
                                                  bringToFront = TRUE))

#Column names for District Comparator Spread Data

crimeSpreadNames<-c("Anti_Social_Behaviour","Bicycle_Theft","Burgalary",
                    "Criminal_Damage/Arson","Drugs","Other_Crime","Other_Theft","Robbery",
                    "Weapon_Possession","Public_Order","Shoplifitng","Theft",
                    "Vehicle_Crime","Sexual_Offences","All_Crimes")