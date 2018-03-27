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
  titlePanel("SATARK"),
  
  # Sidebar with a slider input for number of bins
  sidebarLayout(
    sidebarPanel(
      
      selectInput(inputId="district", label="District",
                  choices=selectAssamDistricts, selected = selectAssamDistricts),
      selectInput(inputId="crimeType", label="Crime Type",
                  choices=crime_names, selected = crime_names),
      dateRangeInput('dateRange',
                     label = 'Date Range',
                     start = Sys.Date() - 3, end = Sys.Date() + 3,
                     min = Sys.Date() - 700, max = Sys.Date(),
                     separator = " - ", format = "dd/mm/yy",
                     startview = 'year', weekstart = 1)
      
    ),
    
    # Show a plot of the generated distribution
    mainPanel(
      leafletOutput("pinpointMap"),
      tableOutput("summary")
    )
  )
))
