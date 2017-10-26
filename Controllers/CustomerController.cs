using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using react_redux_base.Models;

namespace react_redux_base.Controllers
{
    [Route("/api/[controller]")]
    public class CustomerController
    {

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return new[] {
                new Customer { Id = 1, FirstName = "Hem", LastName="Talreja"},
                new Customer { Id = 2, FirstName = "John", LastName="Smith"},
                new Customer { Id = 3, FirstName = "Monty", LastName="Python"}
            };
        }

    }
}