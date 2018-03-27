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
shinyServer(function(input, output,session) {

#Output for Tab 1(crime map)  
  districtFilter <- reactive({
    if (input$district=="All Districts"){
      districtFilterData<-crimeData
    } else{
      districtFilterData<-crimeData[crimeData$crimeDistricts==input$district,]}
  })
  
  crimeFilter <- reactive({
    if (input$crimeType=="All Crimes"){
    #crimeFilterData<-districtFilter()
      crimeFilterData<-crimeData
    } else{
    #crimeFilterData<-districtFilter()
    #crimeFilterData<-crimeFilterData[crimeFilterData$Crime.type==input$crimeType,]}
      crimeFilterData<-crimeData[crimeData$Crime.type==input$crimeType,]}
  })
  
  dateFilter<-reactive({
    #dateFilterData<-crimeFilter()
    #dateFilterData<-dateFilterData[dateFilterData$dates >= input$dateRange[1] & dateFilterData$dates<=input$dateRange[2],]
    dateFilterData<-crimeData[crimeData$dates >= input$dateRange[1] & crimeData$dates<=input$dateRange[2],]
  
  })
  
#Beg of Tab 1 (Crime Map)  
  output$pinpointMap <- renderLeaflet({
    district_crime<-inner_join(districtFilter(),crimeFilter())
    district_crime_date<-inner_join(district_crime,dateFilter())
      assam_leaflet %>%
      addMarkers(data = district_crime_date,~lng, ~lat,  popup= popupTable(district_crime_date))
  })
#End of Tab 1 (Crime Map)
  #######################

#Beg of Tab 2(Analytics)
  
  output$piePlot <- renderPlot({
  district_date<-inner_join(districtFilter(),dateFilter())
 pie(table(district_date$Crime.type))
  })

      #End of Tab 2(Analytics)  
  
  
  
})
