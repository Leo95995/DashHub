src
├── App.tsx
├── assets
│   ├── icons
│   │   ├── dashhub.png
│   │   └── favicon.ico
│   └── images
├── components
│   ├── Alert
│   │   ├── Alert.tsx
│   │   └── types.ts
│   ├── Checkbox
│   │   ├── CheckboxGroup.tsx
│   │   ├── Checkbox.tsx
│   │   └── types.ts
│   ├── Error
│   │   └── Error.tsx
│   ├── Filters
│   │   ├── crypto-filters.tsx
│   │   ├── filters-section.tsx
│   │   ├── github-filters.tsx
│   │   ├── index.tsx
│   │   ├── nasa-filters.tsx
│   │   ├── weather-filters.tsx
│   │   └── widget-filters.tsx
│   ├── Input
│   │   └── Input.tsx
│   ├── Layout
│   │   └── PrivateLayout
│   │       ├── Header.tsx
│   │       ├── Layout.tsx
│   │       ├── MainContent.tsx
│   │       ├── MobileFilters.tsx
│   │       └── SideBar.tsx
│   ├── Loaders
│   │   ├── LoaderWithMessage.tsx
│   │   ├── ReactLoaders.tsx
│   │   └── types.ts
│   ├── Menu
│   │   ├── Menu.tsx
│   │   └── types.ts
│   ├── Modal
│   │   ├── Modal.tsx
│   │   └── types.ts
│   ├── ProfileBar
│   │   ├── ProfileBar.tsx
│   │   └── types.ts
│   ├── Select
│   │   ├── Select.tsx
│   │   └── types.ts
│   ├── Tag
│   │   └── Tag.tsx
│   └── Toggler
│       └── Toggler.tsx
├── context
│   └── ThemeContext.tsx
├── data
│   └── media-queries.ts
├── features
│   ├── auth
│   │   ├── components
│   │   └── hooks
│   └── dashboard
│       ├── components
│       │   ├── DashBoard.tsx
│       │   ├── firstVisitModal
│       │   │   ├── index.tsx
│       │   │   └── types.ts
│       │   ├── header
│       │   │   ├── header.tsx
│       │   │   └── types.ts
│       │   ├── index.ts
│       │   ├── Switcher
│       │   │   ├── datas.ts
│       │   │   ├── switcher.tsx
│       │   │   └── types.ts
│       │   └── Widgets
│       │       ├── CryptoWidget
│       │       │   ├── Charts
│       │       │   │   └── lineChart.tsx
│       │       │   ├── index.tsx
│       │       │   ├── SubWidgets
│       │       │   │   ├── CryptoDetail
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── CryptoGainersAndLosers
│       │       │   │   │   └── index.tsx
│       │       │   │   ├── CryptoTrends
│       │       │   │   │   ├── crypto-list.tsx
│       │       │   │   │   ├── filter-list.tsx
│       │       │   │   │   └── index.tsx
│       │       │   │   └── CryptoWidgetContainers.tsx
│       │       │   └── types.ts
│       │       ├── GithubWidget
│       │       │   ├── index.tsx
│       │       │   ├── SubWidgets
│       │       │   │   ├── github-widgets-container.tsx
│       │       │   │   ├── PopularReposWidget
│       │       │   │   │   ├── github-element.tsx
│       │       │   │   │   ├── index.tsx
│       │       │   │   │   └── PieChart.tsx
│       │       │   │   ├── RandomUserWidget
│       │       │   │   │   └── index.tsx
│       │       │   │   └── UserActivityWidget
│       │       │   │       └── index.tsx
│       │       │   ├── types.ts
│       │       │   └── user-activity-card.tsx
│       │       ├── NasaWidget
│       │       │   ├── index.tsx
│       │       │   ├── SubWidgets
│       │       │   │   ├── nasa_apod.tsx
│       │       │   │   ├── nasa_cme.tsx
│       │       │   │   ├── neows.tsx
│       │       │   │   └── widgets_container.tsx
│       │       │   └── types.ts
│       │       └── WeatherWidget
│       │           ├── index.tsx
│       │           └── StatCard.tsx
│       └── types.ts
├── hooks
│   └── useScreenWidthHook.tsx
├── main.tsx
├── mappers
│   ├── cryptoMapper.ts
│   ├── githubMapper.ts
│   └── nasaMapper.ts
├── pages
│   ├── index.ts
│   └── privates
│       ├── DashboardPage.tsx
│       └── SettingsPage.tsx
├── routes
│   ├── index.ts
│   ├── protectedRoutes.ts
│   └── publicRoutes.ts
├── services
│   ├── crypto
│   │   └── index.ts
│   ├── github
│   │   └── index.ts
│   ├── nasa
│   │   └── index.ts
│   ├── storage
│   │   ├── crypto.ts
│   │   ├── dashboard.ts
│   │   ├── github.ts
│   │   ├── nasa.ts
│   │   ├── storage.ts
│   │   ├── types.ts
│   │   └── user.ts
│   └── weather
│       └── index.ts
├── store
│   ├── appSlice.ts
│   ├── appStore.ts
│   ├── cryptoSlice.ts
│   ├── data
│   │   ├── appData.ts
│   │   ├── cryptoData.ts
│   │   ├── githubData.ts
│   │   └── nasaData.ts
│   ├── filterSlice.ts
│   ├── githubSlice.ts
│   ├── nasaSlice.ts
│   ├── settingsSlice.ts
│   └── weatherSlice.ts
├── styles
│   ├── dark-theme.css
│   ├── index.css
│   └── variables.css
├── types
│   ├── common
│   │   ├── filters.ts
│   │   ├── generic.ts
│   │   └── status.ts
│   ├── services
│   │   ├── crypto.ts
│   │   ├── github.ts
│   │   ├── nasa.ts
│   │   └── weather.ts
│   └── store
│       ├── app.ts
│       ├── crypto.ts
│       ├── github.ts
│       ├── nasa.ts
│       └── weather.ts
├── utils
│   ├── crypto-utils.ts
│   ├── environment.ts
│   ├── filter-utils.ts
│   ├── generic-utils.ts
│   ├── github-utils.ts
│   ├── media-query.ts
│   ├── nasa-utils.ts
│   └── weather-utils.ts
└── vite-env.d.ts

63 directories, 131 files
