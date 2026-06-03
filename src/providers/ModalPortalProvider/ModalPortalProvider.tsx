import { type ReactNode, useEffect, useRef, useState } from 'react';
import { PortalContext } from '../../contexts/PortalContext/PortalContext';

const ModalPortalProvider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, []);

  return (
    <PortalContext.Provider value={container}>
      {children}
      <div ref={ref} id="modal-root" />
    </PortalContext.Provider>
  );
};

export default ModalPortalProvider;
