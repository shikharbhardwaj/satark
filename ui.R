#
# This is the user-interface definition of a Shiny web application. You can
# run the application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)

# Define UI for application that draws a histogram
shinyUI(fluidPage(
  
  # Application title
  #titlePanel("SATARK"),
  
  navbarPage("SATARK",
             
    #Begin first tab 
    tabPanel("Crime Map",
             
             sidebarPanel(
               selectInput(inputId="mapType", label="Map Type",
                           choices=c("Crime Map","Crime Choropleth","Heat Map"), selected = "Crime Maps"),
               
               selectInput(inputId="district", label="District",
                           choices=selectAssamDistricts, selected = "All Districts"),
               
               selectInput(inputId="crimeType", label="Crime Type",
                           choices=crime_names,selected="All Crimes"),
               dateRangeInput('dateRange',
                              label = 'Date Range',
                              start = Sys.Date() -365, end = Sys.Date(),
                              min = Sys.Date() - 700, max = Sys.Date(),
                              separator = " to ", format = "dd/mm/yy",
                              startview = 'year', weekstart = 1)),     
             
        mainPanel(
        leafletOutput("Map")
                 )
  
),
#End of first tab (Crime Type)

#Begin of 2nd tab (Analytics)
        tabPanel("Analytics",
                 sidebarPanel(
                   
                  selectInput(inputId="districtAnalytics", label="District",
                               choices=selectAssamDistricts, selected = "All Districts"),
                   
                   selectInput(inputId="crimeTypeAnalytics", label="Crime Type",
                               choices=crime_names,selected="All_Crimes"),
                   
                  dateRangeInput('dateRangeAnalytics',
                                  label = 'Date Range',
                                  start = Sys.Date() -365, end = Sys.Date(),
                                  min = Sys.Date() - 700, max = Sys.Date(),
                                  separator = " to ", format = "dd/mm/yy",
                                  startview = 'year', weekstart = 1)),
                 
                 mainPanel(
                   plotlyOutput("piePlot"),
                   #plotOutput("districtComparatorPlot"),
                   plotlyOutput("trendPlot")
                 )
                 
                 

),

#End of second tab(Analytics)

#Begin of third tab (Predpol)
        tabPanel("Crime Prediction")
#End of third tab (Predpol)
                 
                 
)



))
