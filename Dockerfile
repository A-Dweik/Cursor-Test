# Build Angular app
FROM node:20-alpine AS angular-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY . .
COPY --from=angular-build /app/wwwroot ./wwwroot
RUN dotnet publish -c Release -o out

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=dotnet-build /app/out .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "Land.Marketplace.dll"]
