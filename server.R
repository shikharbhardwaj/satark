#
# This is the server logic of a Shiny web application. You can run the
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)

# Define server logic required to draw a histogram
shinyServer(function(input, output) {
  
  districtFilter <- reactive({
    if (input$district=="All Crimes"){
      districtFilterData<-crimeData
    } else{
      districtFilterData<-crimeData[crimeData$crimeDistricts==input$district,]}
  })
  
  crimeFilter <- reactive({
    if (input$crimeType=="All Crimes"){
    crimeFilterData<-districtFilter()
    } else{
    crimeFilterData<-districtFilter()
    crimeFilterData<-crimeFilterData[crimeFilterData$Crime.type==input$crimeType,]}
  })
  
  dateFilter<-reactive({
    dateFilterData<-crimeFilter()
    dateFilterData<-dateFilterData[dateFilterData$dates >= input$dateRange[1] & dateFilterData$dates<=input$dateRange[2],]
  })
  
  
  # crime<- reactive({
  #  a <- crimeData[crimeData$Crime.type==input$crimeType,]
  #  return(a)
  #})
  
  
  #crime <- reactive({
  # date_filter_data <- crimeData[crimeData$dates >= input$dateRange[1] & crimeData$dates <= input$dateRange[2],]
  #return (date_filter_data)
  
  #})
  
  
  
  
  output$pinpointMap <- renderLeaflet({
      assam_leaflet %>%
      addMarkers(data = dateFilter(),~lng, ~lat,  popup= popupTable(dateFilter()))
  })
  
  #output$summary <- renderTable({
   # summary <- table(dateFilter())
#  })
  
})
