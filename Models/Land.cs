namespace Land.Marketplace.Models;

public class LandItem
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public double Area { get; set; } // in square meters
    public decimal Price { get; set; }
    public LandStatus Status { get; set; }
    public LandType Type { get; set; }
    public List<string> Features { get; set; } = new();
    public List<string> Images { get; set; } = new();
    public string OwnerName { get; set; } = string.Empty;
    public string OwnerContact { get; set; } = string.Empty;
    public DateTime DatePosted { get; set; }
    public Coordinates? Coordinates { get; set; }
}

public class Coordinates
{
    public double Lat { get; set; }
    public double Lng { get; set; }
}

public enum LandStatus
{
    AVAILABLE,
    PENDING,
    SOLD
}

public enum LandType
{
    RESIDENTIAL,
    COMMERCIAL,
    AGRICULTURAL,
    INDUSTRIAL,
    MIXED_USE
}

public class LandFilter
{
    public string? SearchTerm { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public double? MinArea { get; set; }
    public double? MaxArea { get; set; }
    public LandStatus? Status { get; set; }
    public LandType? Type { get; set; }
    public string? Location { get; set; }
}

public class CreateLandRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public double Area { get; set; }
    public decimal Price { get; set; }
    public LandStatus Status { get; set; }
    public LandType Type { get; set; }
    public List<string> Features { get; set; } = new();
    public List<string> Images { get; set; } = new();
    public string OwnerName { get; set; } = string.Empty;
    public string OwnerContact { get; set; } = string.Empty;
    public Coordinates? Coordinates { get; set; }
}

public class UpdateLandRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public double? Area { get; set; }
    public decimal? Price { get; set; }
    public LandStatus? Status { get; set; }
    public LandType? Type { get; set; }
    public List<string>? Features { get; set; }
    public List<string>? Images { get; set; }
    public string? OwnerName { get; set; }
    public string? OwnerContact { get; set; }
    public Coordinates? Coordinates { get; set; }
}
