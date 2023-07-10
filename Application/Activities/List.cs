using MediatR;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Domain.Activity>> {}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}