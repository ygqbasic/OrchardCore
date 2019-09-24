using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.DisplayManagement.Handlers;

namespace OrchardCore.AdvancedFlow.Handlers
{
    class AdvancedFlowHandler : IContentDisplayHandler
    {
        public Task BuildDisplayAsync(ContentItem contentItem, BuildDisplayContext context)
        {
            return Task.CompletedTask;
        }

        public Task BuildEditorAsync(ContentItem contentItem, BuildEditorContext context)
        {
           var flows = contentItem.As<Flow>
        }

        public Task UpdateEditorAsync(ContentItem contentItem, UpdateEditorContext context)
        {
            throw new NotImplementedException();
        }
    }
}
