using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using ToyStore.Models;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public CartController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("add")]
    public IActionResult AddToCart([FromBody] CartItemDto item)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("WebCodeDb")))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("add_to_cart", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@user_id", item.UserId);
                    cmd.Parameters.AddWithValue("@product_id", item.ProductId);
                    cmd.Parameters.AddWithValue("@product_name", item.ProductName);
                    cmd.Parameters.AddWithValue("@quantity", item.Quantity);
                    cmd.Parameters.AddWithValue("@price", item.Price);

                    cmd.ExecuteNonQuery();
                }
            }

            return Ok(new { success = true, message = "Đã thêm vào giỏ hàng" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Lỗi: " + ex.Message);
        }

    }
}
