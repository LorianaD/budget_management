import { MaskIcon, SectionContainer } from "@/components";
import { selectChooserItems } from "../methodsSelectors";
import MethodsData from "../MethodsData";

const texts = MethodsData.chooser;

// "Comment choisir sa méthode ?": each situation points to a method card of the page
function MethodChooser() {
    const items = selectChooserItems(texts.situations, MethodsData.methods.items);

    const section = {
        id: texts.id,
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    return (
        <SectionContainer section={section} className="panel">
            <ul className="method-chooser">
                {items.map((item) => (
                    <li key={item.key} className={`method-chooser__item method-chooser__item--${item.tone}`}>
                        <h3 className="method-chooser__title">{item.title}</h3>
                        <a className="method-chooser__link" href={`#${item.anchor}`} aria-label={texts.linkLabel(item.methodTitle)}>
                            <span className="method-chooser__pill">{item.methodTitle}</span>
                            <MaskIcon src={texts.chevronIcon} size={14} />
                        </a>
                        <p className="method-chooser__text">{item.text}</p>
                    </li>
                ))}
            </ul>
        </SectionContainer>
    );
}

export default MethodChooser;
