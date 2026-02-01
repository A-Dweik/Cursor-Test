using Microsoft.AspNetCore.Mvc;
using Land.Marketplace.Models;
using Land.Marketplace.Services;

namespace Land.Marketplace.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LandController : ControllerBase
{
    private readonly ILandService _landService;

    public LandController(ILandService landService)
    {
        _landService = landService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<LandItem>> GetAllLands()
    {
        return Ok(_landService.GetAllLands());
    }

    [HttpGet("{id}")]
    public ActionResult<LandItem> GetLandById(string id)
    {
        var land = _landService.GetLandById(id);
        if (land == null)
            return NotFound(new { message = $"Land with id '{id}' not found" });

        return Ok(land);
    }

    [HttpPost]
    public ActionResult<LandItem> CreateLand([FromBody] CreateLandRequest request)
    {
        var land = _landService.AddLand(request);
        return CreatedAtAction(nameof(GetLandById), new { id = land.Id }, land);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateLand(string id, [FromBody] UpdateLandRequest request)
    {
        var success = _landService.UpdateLand(id, request);
        if (!success)
            return NotFound(new { message = $"Land with id '{id}' not found" });

        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteLand(string id)
    {
        var success = _landService.DeleteLand(id);
        if (!success)
            return NotFound(new { message = $"Land with id '{id}' not found" });

        return NoContent();
    }

    [HttpPost("filter")]
    public ActionResult<IEnumerable<LandItem>> FilterLands([FromBody] LandFilter filter)
    {
        var lands = _landService.FilterLands(filter);
        return Ok(lands);
    }

    [HttpGet("available")]
    public ActionResult<IEnumerable<LandItem>> GetAvailableLands()
    {
        var lands = _landService.FilterLands(new LandFilter { Status = LandStatus.AVAILABLE });
        return Ok(lands);
    }
}
