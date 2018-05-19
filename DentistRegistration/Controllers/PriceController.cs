using DentistRegistration.DataAccessLayer;
using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace DentistRegistration.Controllers
{
    public class PriceController : ApiController
    {
        private PriceDataAccessLayer priceDal = new PriceDataAccessLayer();

        // GET: api/Price/5
        public IEnumerable<PriceModel> Get(int id)
        {
            return priceDal.GetAllPricesById(id);
        }

        // POST: api/Price
        [HttpPost]
        public IHttpActionResult InsertPrice([FromBody]PriceModel price)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                bool isAdded = priceDal.InsertPrice(price, out string message);
                if (isAdded)
                {
                    return Ok(message);
                }
                return BadRequest(message);
            }
            catch (Exception)
            {
                return BadRequest(ModelState);
            }
        }

        // PUT: api/Price/5
        public IHttpActionResult Put([FromBody]PriceModel price)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            PriceModel m = price;
            return Ok(price);
        }

        // DELETE: api/Price/5
        public void Delete(int id)
        {
        }
    }
}
