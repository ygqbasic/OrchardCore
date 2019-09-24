using System.Threading.Tasks;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.AdvancedFlows.Models;

namespace OrchardCore.AdvancedFlows.Drivers
{
    public class AdvancedFlowMetadataDisplay : ContentDisplayDriver
    {
        public override IDisplayResult Edit(ContentItem model, IUpdateModel updater)
        {
            var flowMetadata = model.As<AdvancedFlowMetadata>();

            if (flowMetadata == null)
            {
                return null;
            }

            return Initialize<AdvancedFlowMetadata>("AdvancedFlowMetadata_Edit", m =>
            {
                m.Id = flowMetadata.Id;
                m.CssClass = flowMetadata.CssClass;
            }).Location("Footer");
        }

        public override async Task<IDisplayResult> UpdateAsync(ContentItem contentItem, IUpdateModel updater)
        {
            var flowMetadata = contentItem.As<AdvancedFlowMetadata>();

            if (flowMetadata == null)
            {
                return null;
            }

            await contentItem.AlterAsync<AdvancedFlowMetadata>(model => updater.TryUpdateModelAsync(model, Prefix));

            return Edit(contentItem, updater);
        }
    }
}
