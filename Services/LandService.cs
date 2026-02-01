using Land.Marketplace.Models;

namespace Land.Marketplace.Services;

public interface ILandService
{
    IEnumerable<LandItem> GetAllLands();
    LandItem? GetLandById(string id);
    LandItem AddLand(CreateLandRequest request);
    bool UpdateLand(string id, UpdateLandRequest request);
    bool DeleteLand(string id);
    IEnumerable<LandItem> FilterLands(LandFilter filter);
}

public class LandService : ILandService
{
    private readonly List<LandItem> _lands;

    public LandService()
    {
        _lands = GetInitialLands();
    }

    private List<LandItem> GetInitialLands()
    {
        return new List<LandItem>
        {
            new LandItem
            {
                Id = "1",
                Title = "Prime Residential Land in Abdoun",
                Description = "Beautiful residential plot in the heart of Abdoun with stunning views. Perfect for building your dream home.",
                Location = "Abdoun, Amman",
                Area = 1000,
                Price = 500000,
                Status = LandStatus.AVAILABLE,
                Type = LandType.RESIDENTIAL,
                Features = new List<string> { "Mountain View", "Close to Schools", "Quiet Neighborhood", "Utilities Available" },
                Images = new List<string> { "🏡" },
                OwnerName = "Ahmad Mansour",
                OwnerContact = "+962-79-1234567",
                DatePosted = new DateTime(2026, 1, 15),
                Coordinates = new Coordinates { Lat = 31.9567, Lng = 35.8782 }
            },
            new LandItem
            {
                Id = "2",
                Title = "Commercial Land - City Center",
                Description = "Strategic commercial location perfect for retail or office development. High foot traffic area.",
                Location = "Downtown, Amman",
                Area = 2500,
                Price = 1200000,
                Status = LandStatus.AVAILABLE,
                Type = LandType.COMMERCIAL,
                Features = new List<string> { "Main Street", "High Traffic", "Public Transport", "Parking Available" },
                Images = new List<string> { "🏢" },
                OwnerName = "Sara Al-Khalil",
                OwnerContact = "+962-77-9876543",
                DatePosted = new DateTime(2026, 1, 20),
                Coordinates = new Coordinates { Lat = 31.9539, Lng = 35.9106 }
            },
            new LandItem
            {
                Id = "3",
                Title = "Agricultural Land - Jordan Valley",
                Description = "Fertile agricultural land with water access. Ideal for farming or agricultural projects.",
                Location = "Jordan Valley",
                Area = 10000,
                Price = 300000,
                Status = LandStatus.AVAILABLE,
                Type = LandType.AGRICULTURAL,
                Features = new List<string> { "Water Source", "Fertile Soil", "Irrigation System", "Road Access" },
                Images = new List<string> { "🌾" },
                OwnerName = "Mohammed Rashid",
                OwnerContact = "+962-78-5555555",
                DatePosted = new DateTime(2026, 1, 10),
                Coordinates = new Coordinates { Lat = 32.0523, Lng = 35.6157 }
            },
            new LandItem
            {
                Id = "4",
                Title = "Industrial Plot - Sahab",
                Description = "Large industrial plot suitable for factories or warehouses. Easy highway access.",
                Location = "Sahab, Amman",
                Area = 5000,
                Price = 800000,
                Status = LandStatus.PENDING,
                Type = LandType.INDUSTRIAL,
                Features = new List<string> { "Highway Access", "Industrial Zone", "Three-Phase Power", "Large Area" },
                Images = new List<string> { "🏭" },
                OwnerName = "Khalid Omar",
                OwnerContact = "+962-79-7777777",
                DatePosted = new DateTime(2026, 1, 5),
                Coordinates = new Coordinates { Lat = 31.8699, Lng = 36.0015 }
            },
            new LandItem
            {
                Id = "5",
                Title = "Mixed-Use Development Land",
                Description = "Perfect for mixed-use development project. Residential and commercial zoning approved.",
                Location = "Sweifieh, Amman",
                Area = 3000,
                Price = 950000,
                Status = LandStatus.AVAILABLE,
                Type = LandType.MIXED_USE,
                Features = new List<string> { "Mixed Zoning", "Modern Area", "Shopping Nearby", "Investment Opportunity" },
                Images = new List<string> { "🏘️" },
                OwnerName = "Layla Haddad",
                OwnerContact = "+962-77-3333333",
                DatePosted = new DateTime(2026, 1, 25),
                Coordinates = new Coordinates { Lat = 31.9342, Lng = 35.8641 }
            }
        };
    }

    public IEnumerable<LandItem> GetAllLands()
    {
        return _lands;
    }

    public LandItem? GetLandById(string id)
    {
        return _lands.FirstOrDefault(l => l.Id == id);
    }

    public LandItem AddLand(CreateLandRequest request)
    {
        var newLand = new LandItem
        {
            Id = GenerateId(),
            Title = request.Title,
            Description = request.Description,
            Location = request.Location,
            Area = request.Area,
            Price = request.Price,
            Status = request.Status,
            Type = request.Type,
            Features = request.Features,
            Images = request.Images,
            OwnerName = request.OwnerName,
            OwnerContact = request.OwnerContact,
            DatePosted = DateTime.UtcNow,
            Coordinates = request.Coordinates
        };

        _lands.Add(newLand);
        return newLand;
    }

    public bool UpdateLand(string id, UpdateLandRequest request)
    {
        var land = _lands.FirstOrDefault(l => l.Id == id);
        if (land == null) return false;

        if (request.Title != null) land.Title = request.Title;
        if (request.Description != null) land.Description = request.Description;
        if (request.Location != null) land.Location = request.Location;
        if (request.Area.HasValue) land.Area = request.Area.Value;
        if (request.Price.HasValue) land.Price = request.Price.Value;
        if (request.Status.HasValue) land.Status = request.Status.Value;
        if (request.Type.HasValue) land.Type = request.Type.Value;
        if (request.Features != null) land.Features = request.Features;
        if (request.Images != null) land.Images = request.Images;
        if (request.OwnerName != null) land.OwnerName = request.OwnerName;
        if (request.OwnerContact != null) land.OwnerContact = request.OwnerContact;
        if (request.Coordinates != null) land.Coordinates = request.Coordinates;

        return true;
    }

    public bool DeleteLand(string id)
    {
        var land = _lands.FirstOrDefault(l => l.Id == id);
        if (land == null) return false;

        _lands.Remove(land);
        return true;
    }

    public IEnumerable<LandItem> FilterLands(LandFilter filter)
    {
        var query = _lands.AsEnumerable();

        if (!string.IsNullOrEmpty(filter.SearchTerm))
        {
            var term = filter.SearchTerm.ToLower();
            query = query.Where(l =>
                l.Title.ToLower().Contains(term) ||
                l.Description.ToLower().Contains(term) ||
                l.Location.ToLower().Contains(term));
        }

        if (filter.Status.HasValue)
            query = query.Where(l => l.Status == filter.Status.Value);

        if (filter.Type.HasValue)
            query = query.Where(l => l.Type == filter.Type.Value);

        if (!string.IsNullOrEmpty(filter.Location))
            query = query.Where(l => l.Location.ToLower().Contains(filter.Location.ToLower()));

        if (filter.MinPrice.HasValue)
            query = query.Where(l => l.Price >= filter.MinPrice.Value);

        if (filter.MaxPrice.HasValue)
            query = query.Where(l => l.Price <= filter.MaxPrice.Value);

        if (filter.MinArea.HasValue)
            query = query.Where(l => l.Area >= filter.MinArea.Value);

        if (filter.MaxArea.HasValue)
            query = query.Where(l => l.Area <= filter.MaxArea.Value);

        return query.ToList();
    }

    private string GenerateId()
    {
        return Guid.NewGuid().ToString("N")[..12];
    }
}
