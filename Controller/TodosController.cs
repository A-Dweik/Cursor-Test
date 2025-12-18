using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Todos.Models;
using Todos.Models.Requests;

namespace Todos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private static readonly ConcurrentDictionary<Guid, TodoItem> Store = new ConcurrentDictionary<Guid, TodoItem>();

        static TodosController()
        {
            var seed = new TodoItem
            {
                Id = Guid.NewGuid(),
                Title = "إعداد قائمة مهام اليوم",
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            Store.TryAdd(seed.Id, seed);
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodos()
        {
            var todos = Store
                .Values
                .OrderBy(t => t.CreatedAt)
                .ToList();

            return Ok(todos);
        }

        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetTodo(Guid id)
        {
            if (Store.TryGetValue(id, out var todo))
            {
                return Ok(todo);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult<TodoItem> CreateTodo([FromBody] CreateTodoRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Title))
            {
                return BadRequest("Title is required.");
            }

            var todo = new TodoItem
            {
                Id = Guid.NewGuid(),
                Title = request.Title.Trim(),
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            Store[todo.Id] = todo;

            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public ActionResult<TodoItem> UpdateTodo(Guid id, [FromBody] UpdateTodoStatusRequest request)
        {
            if (!Store.TryGetValue(id, out var existing))
            {
                return NotFound();
            }

            existing.IsCompleted = request?.IsCompleted ?? existing.IsCompleted;
            Store[id] = existing;

            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(Guid id)
        {
            if (!Store.TryRemove(id, out _))
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
